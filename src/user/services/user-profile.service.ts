import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserProfile } from '../interfaces';
import {
  CreateUserProfileDTO,
  UpdateUserProfileDTO,
  UserDTO,
  UserProfileDto,
} from '../dto';
import { AwsS3Service } from 'src/aws/services';

@Injectable()
export class UserProfileService {
  private AWS_SERVICE_IMG_FOLDER = 'UserProfileImage';
  /**
   * Constructor
   * @param {Model<IUserProfile>} userProfileModel
   */
  constructor(
    @InjectModel('UserProfile')
    private readonly userProfileModel: Model<IUserProfile>,
    private readonly awsFileService: AwsS3Service,
  ) {}

  /**
   * Create a user profile
   * @param {IUser} user
   * @param {CreateUserProfileDTO} createUserProfileDTO
   * @returns {Promise<IUserProfile>}
   */
  create(
    user: IUser,
    createUserProfileDTO: CreateUserProfileDTO,
  ): Promise<IUserProfile> {
    try {
      const userProfileDTO = new UserProfileDto();
      userProfileDTO.user = user._id;
      userProfileDTO.cBy = user._id;
      const setUserProfile = { ...userProfileDTO, ...createUserProfileDTO };
      const registerDoc = new this.userProfileModel(setUserProfile);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit profile data by user
   * @param {IUser} user
   * @param {UpdateUserProfileDTO} updateUserProfileDto
   * @returns {Promise<IUser>} mutated user data
   */
  async update(
    user: IUser,
    updateUserProfileDto: UpdateUserProfileDTO,
    files: {
      proPic?: Express.Multer.File[];
    },
  ) {
    try {
      const userProfile = await this.userProfileModel.findOne({
        user: user._id,
      });
      if (!userProfile) {
        return Promise.reject(new NotFoundException('User not found.'));
      }
      const userDTO = new UserDTO();

      if (files) {
        if (files && files.proPic) {
          const uploadRes = await this.awsFileService.uploadToS3(
            files.proPic[0],
            this.AWS_SERVICE_IMG_FOLDER,
          );
          userDTO.profilePic = uploadRes.Location;
        }
      }
      userDTO.uTime = Date.now();
      const setUser = { ...updateUserProfileDto, ...userDTO };

      return await userProfile.set(setUser).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  async updateById(id: string, updateUserProfileDto: UpdateUserProfileDTO) {
    try {
      const userProfile = await this.userProfileModel.findOne({
        user: id,
      });
      if (!userProfile) {
        return Promise.reject(new NotFoundException('User not found.'));
      }
      const userDTO = new UserDTO();
      userDTO.uTime = Date.now();
      const setUser = { ...updateUserProfileDto, ...userDTO };

      return await userProfile.set(setUser).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
