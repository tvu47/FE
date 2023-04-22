export class Product {

    constructor(public id:number,
        public productName:string,
        public price:number,
        public quantity:number,
        public color:any,
        public size:any,
        public limitQuantity:number
        ){
            //color: {id,colorName}
            //size: {id, sizeName}
    }

}
