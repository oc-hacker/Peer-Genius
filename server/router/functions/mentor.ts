import * as httpStatus from 'http-status-codes';

import * as models from '../../database/models';
import { communicationMethods } from '../../database/models/communication';
import { newConnection } from '../../database/reference';

import { Response } from 'express';
import { VerifiedRequest } from '../../types';

