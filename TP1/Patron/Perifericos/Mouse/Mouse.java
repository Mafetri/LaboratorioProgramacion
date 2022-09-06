package Patron.Perifericos.Mouse;
import Patron.Perifericos.*;

public class Mouse extends Periferico {
    private String modelo, marca;
    private int precio, cantidad;


    public String getModelo() {
        return this.modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return this.marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public int getPrecio() {
        return this.precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return this.cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }


}