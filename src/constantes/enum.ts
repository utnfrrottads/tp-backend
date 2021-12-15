module.exports = () => {

   enum TipoCliente {
       MAYORISTA,
       MINORISTA,
    }

    class enumTipoCliente{

       public getTipoCliente(tipo: string): TipoCliente{

           let value: TipoCliente;
           if(tipo === 'mayorista'){
               value = TipoCliente.MAYORISTA;
           }else if(tipo === 'minorista'){
               value = TipoCliente.MINORISTA;
           }
           return value;
        }
    }
    return enumTipoCliente;
}
