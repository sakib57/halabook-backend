import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../user/interfaces';
import { ICity, IPaginatedCity } from '../interfaces';
import { UpdateCityDTO } from '../dto/city/update-city.dto';
import { CitySearchQueryDTO } from '../dto/city/city-search-query.dto';
import { CreateCityDTO } from '../dto/city/create-city.dto';
import { CityDTO } from '../dto/city/city.dto';

/**
 * State Service
 */
@Injectable()
export class CityService {
  /**
   * Constructor
   * @param {Model<ICity>} cityModel
   */
  constructor(
    @InjectModel('City')
    private readonly cityModel: Model<ICity>,
  ) {}

  /**
   * Create state
   * @param {IUser} user
   * @param {CreateCityDTO} createCityDTO
   * @returns {Promise<ICity>}
   */
  create(user: IUser, createCityDTO: CreateCityDTO): Promise<ICity> {
    try {
      const cityDTO = new CityDTO();
      cityDTO.slug = createCityDTO.name
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/['"<>@+?.,\/#!$%&;:{}=`~()]/g, '')
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '');
      cityDTO.cBy = user._id;
      const setCity = { ...createCityDTO, ...cityDTO };
      const registerDoc = new this.cityModel(setCity);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Edit city
   * @param {string} id
   * @param {UpdateCityDTO} updateCityDTO
   * @returns {Promise<ICity>} mutated city data
   */
  async update(id: string, updateCityDTO: UpdateCityDTO): Promise<ICity> {
    try {
      const city = await this.cityModel.findOne({ _id: id });
      if (!city) {
        return Promise.reject(new NotFoundException('Could not find city.'));
      }
      const cityDTO = new CityDTO();
      const setCity = { ...updateCityDTO, ...cityDTO };

      return await city.set(setCity).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Fetches cities
   * @returns {Promise<IPaginatedCity>}
   */
  async findAll(query: CitySearchQueryDTO): Promise<IPaginatedCity> {
    try {
      const searchQuery: any = {
        isActive: true,
        isDeleted: false,
      };

      if (query.hasOwnProperty('noCondition') && query.noCondition === true) {
        delete searchQuery.isActive;
        delete searchQuery.isDeleted;
      }
      if (query.hasOwnProperty('state') && query.state) {
        searchQuery.state = query.state;
      }

      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      if (query.hasOwnProperty('cityname') && query.cityname) {
        searchQuery.city = query.cityname;
        const data = await this.cityModel
          .find({ name: new RegExp(`^${query.cityname}`, 'i') })
          .populate('state')
          .exec();
        const result: IPaginatedCity = {
          data,
        };

        if (query.pagination) {
          result.pagination = {
            total: await this.cityModel.countDocuments(searchQuery),
            limit,
            skip,
          };
        }

        return result;
      } else {
        const data = await this.cityModel
          .find(searchQuery)
          .populate('state')
          .limit(limit)
          .skip(skip)
          .sort('name ASC');
        const result: IPaginatedCity = {
          data,
        };

        if (query.pagination) {
          result.pagination = {
            total: await this.cityModel.countDocuments(searchQuery),
            limit,
            skip,
          };
        }

        return result;
      }
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * find city by cityId
   * @param {string} id
   * @returns {Promise<ICity>}
   */
  async findOne(id: string): Promise<ICity> {
    try {
      const city = await this.cityModel
        .findOne({ _id: id })
        .populate({
          path: 'cities',
        })
        .populate('state')
        .exec();
      if (!city) {
        return Promise.reject(new NotFoundException('Could not find city.'));
      }
      return city;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
