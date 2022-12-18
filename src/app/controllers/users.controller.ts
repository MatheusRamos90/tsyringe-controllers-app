import "reflect-metadata";
import {Request, Response} from 'express';
import {UsersService} from '../service/users.service';
import {UsersResponse} from '../dto/users-response';
import {StatusCodes} from 'http-status-codes';
import {injectable} from "tsyringe";
import {Get, JsonController, Req, Res} from "routing-controllers";
import {Inject, Service} from "typedi";

@injectable()
@Service()
@JsonController('/api/users')
export class UsersController {

    @Inject()
    private readonly usersService!: UsersService;

    @Get('')
    public async getAll(@Req() req: Request, @Res() res: Response) {
        return await this.usersService
            .getAll()
            .then((users: UsersResponse[]) => res.status(StatusCodes.OK).json(users))
            .catch(reason => {
                res.status(StatusCodes.BAD_REQUEST).json({ message: reason.message });
            });
    }

}
