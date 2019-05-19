import {Injectable}   from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { Produto } from 'src/app/produto/produto.component';
import { Subscription } from 'rxjs/internal/Subscription';


@Injectable()
export class ProdutoService {

    private productsUrl = 'https://localhost:44355/produto/';    
    produtos: Produto[];
    subscriptionProdutos: Subscription;
    constructor(private http: Http) { }

    getProducts() : Observable<Response>{
        return this.http.get(this.productsUrl);
    }
    getProductsbyId(id) : Observable<Response>{
        return this.http.get(this.productsUrl + id);
    }

    addProduct(produto: Produto) {            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(this.productsUrl, produto, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
        })
    }

    deleteProduct(id: string) {             
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers});

        this.http.delete(this.productsUrl + id, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
            window.location.reload();
        })
    }

    
    updateProduct(produto: Produto, id) {              
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers});

        this.http.put(this.productsUrl + id, produto, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
        })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}