import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';


import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

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

   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// mongodb+srv://ramijawadi104:<db_password>@cluster0.rwhv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

