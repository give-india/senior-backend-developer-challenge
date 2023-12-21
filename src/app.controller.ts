import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUsersAndAccountsDTO } from './dto/create-user-and-accounts.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return '';
  }

  @Post('/seed')
  @UsePipes(ValidationPipe)
  seed(@Body() body: CreateUsersAndAccountsDTO) {
    return this.appService.createUsersAndAccounts(body);
  }

  @Post('/transfer')
  @UsePipes(ValidationPipe)
  transfer(@Body() body: TransferDto) {
    return this.appService.transferMoney(body);
  }
}
