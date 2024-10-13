import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "../Model/user.schema";
import { UserService }  from "../Services/user.service"
import { JwtService } from '@nestjs/jwt'
import { get } from "mongoose";

@Controller('user')
export class UserController {
    constructor(private readonly userServerice: UserService,
        private jwtService: JwtService
    ) { }
         @Get('/')
         async getAllUser(@Res()  @Res() response, ) {
          const users = await this.userServerice.getAll();
          return response.status(HttpStatus.OK).json(users);
             
         }


        @Post('signup')
        async Signup(@Res() response, @Body() user: User) {
            console.log(user)
            const newUSer = await this.userServerice.signup(user);
            console.log(newUSer)
            return response.status(HttpStatus.CREATED).json({
                newUSer
            })
        }
        @Post('signin')
        async SignIn(@Res() response, @Body() user: User) {
            const token = await this.userServerice.signin(user, this.jwtService);
            return response.status(HttpStatus.OK).json(token)

          
        }
    }


    