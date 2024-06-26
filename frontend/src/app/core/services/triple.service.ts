import { Injectable } from '@angular/core';
import TripleUpdate from '../types/triple_update';
import Triple from '../types/triple';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { lastValueFrom, map } from 'rxjs';
import TriplesResponse from '../types/triples_response';

@Injectable({
  providedIn: 'root',
})
export class TripleService {
  constructor(private http: HttpClient) {}

  public async getTriples(objectId: string): Promise<TriplesResponse> {
    const httpRequest = this.http
      .get(environment.triplesEndpoint, {
        params: {
          object_id: objectId,
        },
      })
      .pipe(map((res: any) => res));
    return lastValueFrom(httpRequest);
  }

  public async updateTriples(tripleUpdates: TripleUpdate[]) {
    const httpRequest = this.http.post(environment.tripleUpdatesEndpoint, {
      triple_updates: tripleUpdates.map(tripleUpdate => {
        return {
          original_triple: tripleUpdate.originalTriple,
          updated_triple: tripleUpdate.updatedTriple,
          timestamp: tripleUpdate.timestamp
        }
      })
    });
    return lastValueFrom(httpRequest);
  }
}
