import { Source } from "./source";
export interface Hit {

	_index: string,
	_type: string,
	_id:number,
	_score: number,
	_source: Source

}
