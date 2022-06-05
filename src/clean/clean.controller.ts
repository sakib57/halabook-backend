import { Controller, Patch, HttpStatus, HttpException } from '@nestjs/common';
import { CleanService } from './clean.service';

@Controller('clean')
export class CleanController {
  /**
   * Constructor
   * @param {CleanService} cleanService
   */
  constructor(private readonly cleanService: CleanService) {}

  @Patch()
  async clean() {
    try {
      await this.cleanService.cleanUser();
      await this.cleanService.cleanSP();
      return {
        success: 'success',
      };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
