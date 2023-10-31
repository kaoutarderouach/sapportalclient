import { Hit } from "./hit";

export interface EP1 {
    took: number,
    hits: Hit[]


    }

/*
Niveau: string,
 Description: string,
  TransactionCode: string,
  EP1: string,
   sage: number,
    stext: string */
/*

 elas =
 took: number,
 timed_out: boolean,
 _shards: { total: number,
 successful: number,
 skipped: number,
 failed: number },
 hits: { total:
 { value: number, relation: string },
  max_score!: number, hits: [ { _index: string, _type: string, _id!:number, _score: number, _source: { Niveau: string, Description: string, TransactionCode: string, EP1: string, sage: number, stext: "string} } ] } }

*/
