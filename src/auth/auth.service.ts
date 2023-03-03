import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    return this.userModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto) {
    //Check if user exists
    const { email, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ email: email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    //Check if password is correct
    const checkPasswd = await compare(password, findUser.password);
    if (!checkPasswd) throw new HttpException('PASSWORD_INCORRECT', 403);

    //Creacion del token mediant JWT
    const payload = { id: findUser._id, name: findUser.name };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }
}
