
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';


import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { VideoController } from './Controllers/video.controller';
import { VideoService } from './Services/video.service';
import { UserService } from './Services/user.service';
import { UserController } from './Controllers/user.controller';
import { Video, VideoSchema } from './model/video.schema';
import { User, UserSchema } from './model/user.schema';


import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { isAuthenticated } from './Middlewares/app.middleware';



@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
  imports:[MongooseModule.forRoot('mongodb+srv://ramijawadi104:1234@cluster0.rwhv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 

    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),


    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      })
    }),


    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  
   ],
  controllers: [   VideoController, UserController],
  providers: [ VideoService, UserService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'api/v1/video/:id', method: RequestMethod.GET }
      )
      .forRoutes(VideoController);
  }
}



// mongodb+srv://ramijawadi104:<db_password>@cluster0.rwhv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

