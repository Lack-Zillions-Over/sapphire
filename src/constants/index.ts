import { Sapphire } from '../controllers/index';
import { config }  from 'dotenv';

config();

const sapphire = new Sapphire();

export default sapphire;
