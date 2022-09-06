package Patron;
import java.util.Scanner;
import Patron.Factories.*;
import Patron.Perifericos.*;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Periferico> inventario = new ArrayList<Periferico>(); // Create an ArrayList object
        int opcion = 0;
        String modelo;
        Scanner scanner = new Scanner(System.in); 
        
        do{
            menuPrincipal();
            opcion = scanner.nextInt();
            switch (opcion) {
                case 1: 
                    inventario.add(crearProducto()); 
                    break;
                case 2: 
                    System.out.println("Ingrese modelo: "); 
                    modelo = scanner.next();
                    mostrarProducto(buscarProducto(inventario, modelo)); 
                    break;
                case 3:
                    mostrarClases(inventario);
                    break;
            }
        }while(opcion != 0);
    }

    public static void menuPrincipal(){
        System.out.println("=======================================");
        System.out.println("|           MENU PRINCIPAL            |");
        System.out.println("=======================================");
        System.out.println("| 1. Ingresar Producto                |");
        System.out.println("| 2. Buscar Prodcuto                  |");
        System.out.println("| 3. Mostrar clases de productos      |");
        System.out.println("=======================================");
    }
    
    public static void mostrarProducto(Periferico periferico){
        if(periferico != null){
            System.out.println("=================================");
            System.out.println("| Modelo: " + periferico.getModelo());
            System.out.println("| Marca: " + periferico.getMarca());
            System.out.println("| Precio: " + periferico.getPrecio());
            System.out.println("| Stock: " + periferico.getCantidad());
            System.out.println("=================================");
        }else{
            System.out.println("No existe dicho modelo");
        }
    }

    public static Periferico buscarProducto(ArrayList<Periferico> p, String modelo){
        Periferico r = new Periferico();
        for (int i = 0; i < p.size(); i++) {
            if(p.get(i).getModelo().equalsIgnoreCase(modelo)){
                r = p.get(i);
            }
        }
        return r;
    }

    public static void mostrarClases(ArrayList<Periferico> p){
        for (int i = 0; i < p.size(); i++) {
            System.out.print("-> " + i + ": ");
            System.out.println(p.get(i).getClass());
        }
    }

    public static Periferico crearProducto(){
        // Variables
        Scanner scanner = new Scanner(System.in); 
        String tipo = "", nombrePeriferico, modelo, marca;
        int precio, cantidad;
        Periferico periferico;

        // Fabricas
        PCFactory fabricaPC = new PCFactory();
        ConsolaFactory fabricaConsola = new ConsolaFactory();

        // Ingreso de Datos
        System.out.println("Ingrese tipo: ");
        tipo = scanner.nextLine();
        System.out.println("Ingrese periferico: ");
        nombrePeriferico = scanner.nextLine();
        
        // Creacion de periferico segun los datos ingresados utilizando las factories correspondientes
        switch(tipo){
            case "PC" : periferico = fabricaPC.createPeriferico(nombrePeriferico); break;
            case "CONSOLA" : periferico = fabricaConsola.createPeriferico(nombrePeriferico); break;
            default : periferico = null;
        }

        // Si periferico es null, entonces hubo un error en tipo o el nombrePeriferico
        if(periferico == null){
            System.out.println("ERROR!!! BERSA 380");
        }else{
            System.out.println("Ingrese modelo: ");
            modelo = scanner.nextLine();
            periferico.setModelo(modelo);
            System.out.println("Ingrese marca: ");
            marca = scanner.nextLine();
            periferico.setMarca(marca);
            System.out.println("Ingrese precio: ");
            precio = scanner.nextInt();
            periferico.setPrecio(precio);
            System.out.println("Ingrese cantidad: ");
            cantidad = scanner.nextInt();
            periferico.setCantidad(cantidad);
            mostrarProducto(periferico);
        }

        return periferico;
    }
}
