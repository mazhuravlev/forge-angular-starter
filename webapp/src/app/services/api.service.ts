import {Injectable} from "@angular/core";
import {HubConnection} from "@aspnet/signalr-client";
import {environment} from "../../environments/environment";
import {SnackService} from "./snack.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TokenDto} from "../dto/token.dto";
import "rxjs/add/operator/map";
import "rxjs/add/observable/never";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

@Injectable()
export class ApiService {
  private connection: HubConnection;

  constructor(private snackService: SnackService, private http: HttpClient) {

  }

  public init() {
    const connection = this.connection = new HubConnection(`${environment.apiEndpoint}/hub`,
      {transport: environment.signalrTransport});
    connection.onclose(e => {
      this.snackService.error('Соединение с сервером разорвано: ' + (e && e.message) || 'ошибка');
    });
    connection.start().then(() => {
      this.snackService.success('Сервер подключен');
    }).catch(e => {
      this.snackService.error('Ошибка подключения: ' + (e && e.message) || 'ошибка');
    });
  }

  public getToken(): Observable<TokenDto> {
    return this.http.get('/api/token').map(x => x as TokenDto)
      .catch((e: Error) => {
        this.snackService.error('Ошибка получения токена: ' + (e && e.message) || 'ошибка');
        return Observable.throw(e);
      });
  }
}
