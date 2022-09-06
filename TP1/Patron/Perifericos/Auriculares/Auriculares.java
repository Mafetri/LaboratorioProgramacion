package Patron.Perifericos.Auriculares;
import Patron.Perifericos.*;

public class Auriculares extends Periferico{
    private String modelo, marca;
    private int precio, dB, cantidad;
    private boolean sorround;

    // Precio
    public int getPrecio(){
        return this.precio;
    }
    public void setPrecio(int precio){
        this.precio = precio;
    }
    // Modelo
    public String getModelo(){
        return this.modelo;
    }
    public void setModelo(String modelo){
        this.modelo = modelo;
    }
    public String getMarca(){
        return this.marca;
    }
}