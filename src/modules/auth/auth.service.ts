import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDTO } from './dto/signup-dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { sendBadRequest, sendSuccess } from 'src/shared/utils/response.utils';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    async signUp(body: SignUpDTO, res: Response) {
        const response: {
            err?: string;
            message: string;
            data: {
                user_id: string;
                token: string;
            };
        } = await firstValueFrom(
            this.userClient.send({ cmd: 'auth.sign-up' }, body),
        );

        if (response?.err) {
            return res.status(400).send({
                message: response.message,
            });
        }

        res.cookie('authorization', response.data.token, {});

        return res.send({
            message: response.message,
            data: response.data,
        });
    }

    async login(body: any, res: Response) {
        const response: {
            err?: string;
            message: string;
            data: {
                user_id: string;
                token: string;
            };
        } = await firstValueFrom(
            this.userClient.send({ cmd: 'auth.login' }, body),
        );

        if (response?.err) {
            res.status(400).send({
                message: response.message,
            });
        }

        res.cookie('authorization', response.data.token, {});

        return res.send({
            message: response.message,
            data: response.data,
        });
    }
}
