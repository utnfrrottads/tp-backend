module.exports = () => {

    enum TipoClienteEnum {
        MAYORISTA,
        MINORISTA,
    }

    class enumTipo {

        public getTipo(tipo: string): TipoClienteEnum {

            let value: TipoClienteEnum;
            if (tipo === 'mayorista') {
                value = TipoClienteEnum.MAYORISTA;
            } else if (tipo === 'minorista') {
                value = TipoClienteEnum.MINORISTA;
            }
            return value;
        }
    }
    return enumTipo;
}
