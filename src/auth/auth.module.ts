import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ModulesContainer } from '@nestjs/core';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jw.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
     signOptions: { expiresIn: '20h' }, //'20h' es el tiempo de vida de nuestra sesion
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
