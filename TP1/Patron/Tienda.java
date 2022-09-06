package Patron;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.util.Arrays;

public class Tienda {
    public static void main(String[] args) {
        Producto[] inventario = new Producto[1000000];
        for(int i = 0; i < inventario.length; i++){
            if(i % 2 == 0){
                inventario[i] = new Producto("asdad", "Cerveza", 1258);
            }else{
                inventario[i] = new Producto("asdad", "Agua", 1258);
            }
        }

        long startTime = System.nanoTime();
        ForkJoinPool pool = new ForkJoinPool();
		ActualizadorPrecios app = new ActualizadorPrecios(inventario, "Cerveza", 12.8, 0, inventario.length);
		pool.invoke(app);
        long endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);

        startTime = System.nanoTime();
        for(int i = 0; i < inventario.length; i++){
            if(inventario[i].getCategoria().equals("Cerveza")){
                inventario[i].setPrecio(inventario[i].getPrecio() * 12.8 / inventario[i].getPrecio() + inventario[i].getPrecio());
            }
        }
        endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);
    }
}
class ActualizadorPrecios extends RecursiveAction{
    final int threshold = 100;
    int inicio, fin;
    double aumentoPorcentual;
    String categoria;
    Producto[] inventario;

    ActualizadorPrecios(Producto[] inventario, String categoria, double aumentoPorcentual, int inicio, int fin) {
        this.inicio = inicio;
        this.fin = fin;
        this.inventario = inventario;
        this.categoria = categoria;
        this.aumentoPorcentual = aumentoPorcentual;
    }

    @Override
    protected void compute() {
        if((fin - inicio) < threshold){
            for(int i = inicio; i < fin; i++){
                if(inventario[i].getCategoria().equals(categoria)){
                    inventario[i].setPrecio(inventario[i].getPrecio() * aumentoPorcentual / inventario[i].getPrecio() + inventario[i].getPrecio());
                }
            }
        }else {
            int medio = (inicio + fin)/2;
            invokeAll(new ActualizadorPrecios(inventario, categoria, aumentoPorcentual, inicio, medio), new ActualizadorPrecios(inventario, categoria, aumentoPorcentual, medio, fin));
        }
    }
}
class Producto {
    private String nombre, categoria;
    private double precio;

    public Producto(String nombre, String categoria, double precio) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }

    public String getCategoria() {
        return categoria;
    }
    public double getPrecio() {
        return precio;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public void setPrecio(double precio) {
        this.precio = precio;
    }
}