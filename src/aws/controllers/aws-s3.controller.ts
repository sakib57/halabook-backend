import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { IUser } from '../../user/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '../services';
import { FileUploadDTO } from '../dto/file-upload.dto';

@ApiTags('File Upload')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('file')
export class AwsS3Controller {
  private AWS_SERVICE_IMG_FOLDER = 'Halabook';
  constructor(private readonly s3Service: AwsS3Service) {}

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'File or Image Upload' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return upload information.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDTO })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async create(@User() user: IUser, @UploadedFile() file: Express.Multer.File) {
    try {
      return await this.s3Service.uploadToS3(file, this.AWS_SERVICE_IMG_FOLDER);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get()
  public createGet() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiExcludeEndpoint()
  @Patch()
  public createPatch() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiExcludeEndpoint()
  @Put()
  public createPut() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiExcludeEndpoint()
  @Delete()
  public createDelete() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'File or Image delete' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return delete information.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @Delete('delete')
  async remove(@User() user: IUser, @Body() obj: { key: string }) {
    try {
      console.log(obj);
      return await this.s3Service.deleteFile(obj.key);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  @ApiExcludeEndpoint()
  @Get('delete')
  public removeGet() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('delete')
  public removePatch() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiExcludeEndpoint()
  @Put('delete')
  public removePut() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }

  @ApiExcludeEndpoint()
  @Post('delete')
  public removePost() {
    throw new MethodNotAllowedException('Method Not Allowed');
  }
}
