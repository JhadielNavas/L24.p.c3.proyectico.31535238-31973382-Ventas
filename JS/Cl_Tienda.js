import Dt_Ventas from "./Dt_Ventas.js";
import Dt_Tienda from "./Dt_Tienda.js";
export default class Cl_Tienda{

    constructor(montoCaja = Dt_Tienda.montoCaja, incremento = Dt_Tienda.porcIncremento){
        this.ventas = [];
        this.montoCaja = montoCaja;
        this.incremento = incremento;
    }

    agregarArticulo(venta){
        this.ventas.push(venta);
    }

    eliminarRVenta(factura){
        let facturaVenta = -1;
        for (let i = 0; i < this.ventas.length; i++){
            if (this.ventas[i].factura == factura){ 
                facturaVenta = i;
                break;
            }
        }
        if (facturaVenta !== -1){
            this.ventas.splice(facturaVenta, 1);
        }
        return facturaVenta !== -1;
        
    }

    clientesMontoMayor(){
        let mayor = this.ventas[0].calcularPrecioVenta();
        for(let i = 1; i < this.ventas.length; i++){
            if(this.ventas[i].calcularPrecioVenta() > mayor){
                mayor = this.ventas[i].calcularPrecioVenta();
            }
        }
        return this.ventas.filter(venta => venta.calcularPrecioVenta() == mayor).map(venta => venta.nombreCliente);
    }

    clientesDeUnArticulo(){
        return this.ventas.filter(venta => venta.cnArticulos == 1).map(venta => venta.nombreCliente);
    }

    calcularAcumulado(){
        for(let i = 0; i < this.ventas.length; i++){
            this.montoCaja += this.ventas[i].calcularPrecioVenta();
        }
        return this.montoCaja;
    }

}
