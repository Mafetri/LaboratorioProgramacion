package Patron.Perifericos;
public class Periferico {
    private String modelo, marca;
    private int precio, cantidad;

    public Periferico() {
    }
    
    // ---- Modelo ----
    public String getModelo() {
        return this.modelo;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    // ---- Marca ----
    public String getMarca() {
        return this.marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    // ---- Precio ----
    public int getPrecio() {
        return this.precio;
    }
    public void setPrecio(int precio) {
        this.precio = precio;
    }

    // ---- Cantidad ----
    public int getCantidad() {
        return this.cantidad;
    }
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    // ---- Who am i ----
    public String whoami(){
        return null;
    }
}
