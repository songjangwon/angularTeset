import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import{ Observable} from'rxjs-compat/Observable';
import{ of } from'rxjs-compat/Observable/of';
import{ MessageService} from './message.service';
import{ HttpClient, HttpHeaders} from '@angular/common/http';
// import { tap } from 'rxjs/operators';

@Injectable()
export class HeroService {
  private heroesURL = 'http://localhost:8080/heros'
  constructor(private http: HttpClient, private messageService:MessageService) { }
  getHeroes(): Observable<Hero[]> {
    //send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);

    }
    getHero(id: number): Observable<Hero> {

        const url = `${this.heroesURL}/${id}`
        this.messageService.add('HeroService: fetched heroes');

        return this.http.get<Hero>(url);

        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(HEROES.find(hero => hero.id === id));



        // return this.http.get<Hero[]>(this.heroesURL)
        // .pipe(
        //     tap(heroes => this.log(`fetched heroes`)).
        //     catchError(this.handleError('getHeroes', []))
        // );
    }





    // private handleError<T> (operation = 'operation', result?: T) {
    //     return(error: any): Observable<T> => {
    //         // TODO: send the error to remote logging infrastructure
    //         console.error(error); // log to console instead// TODO: better job of transforming error for user consumption
    //         this.log(`${operation} failed: ${error.message}`);// Let the app keep running by returning an empty result.
    //         return of(result as T);};}
}
