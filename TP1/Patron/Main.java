package Patron;
import java.util.Scanner;
import Patron.Factories.*;
import Patron.Perifericos.*;
import java.util.ArrayList;

public class Main {
    // Fabricas
    static PCFactory PCFactory = new PCFactory();
    static ConsolaFactory ConsolaFactory = new ConsolaFactory();

    public static void main(String[] args) {
        ArrayList<Periferico> inventario = new ArrayList<Periferico>();
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
            System.out.println(" -> No existe dicho modelo");
        }
    }

    // ---- Buscar Producto ----
    public static Periferico buscarProducto(ArrayList<Periferico> p, String modelo){
        Periferico r = null;
        for (int i = 0; i < p.size(); i++) {
            if(p.get(i).getModelo().equalsIgnoreCase(modelo)){
                r = p.get(i);
            }
        }
        return r;
    }

    // ---- Mostrar clases de productos ----
    public static void mostrarClases(ArrayList<Periferico> p){
        for (int i = 0; i < p.size(); i++) {
            if(p.get(i) != null){
                System.out.print("-> " + i + ": ");
                System.out.println(p.get(i).whoami());
            }
        }
    }

    // ---- Ingresar Producto ----
    public static Periferico crearProducto(){
        String tipo;
        Periferico r = null;
        Scanner scanner = new Scanner(System.in); 

        System.out.println("Ingrese tipo: ");
        tipo = scanner.next();
        switch(tipo.toUpperCase()) {
            case "CONSOLA" : r = constructorProducto(ConsolaFactory); break;
            case "PC" : r = constructorProducto(PCFactory); break;
            default : System.out.println("ERROR! Bersa 380");
        }

        return r;
    }
    public static Periferico constructorProducto(AbstractFactory factory){
        // Variables
        Scanner scanner = new Scanner(System.in); 
        String tipo, modelo, marca;
        int precio, cantidad;
        Periferico periferico = null;

        // Ingreso de Datos
        while(periferico == null){
            System.out.println("Ingrese periferico: ");
            tipo = scanner.nextLine();
            
            // Creacion de periferico solicitado
            switch(tipo.toUpperCase()){
                case "TECLADO" : periferico = factory.createTeclado();
                case "MOUSE" : periferico = factory.createMouse();
                case "AURICULAR" : periferico = factory.createAuriculares();
                case "AURICULARES" : periferico = factory.createAuriculares();
            }
    
            // Si periferico es null, entonces hubo un error
            if(periferico == null){
                System.out.println("ERROR!!! BERSA 380");
            }
        }

        // Modelo
        System.out.println("Ingrese modelo: ");
        modelo = scanner.nextLine();
        periferico.setModelo(modelo);

        // Marca
        System.out.println("Ingrese marca: ");
        marca = scanner.nextLine();
        periferico.setMarca(marca);

        // Precio
        System.out.println("Ingrese precio: ");
        precio = scanner.nextInt();
        periferico.setPrecio(precio);

        // Cantidad en stock
        System.out.println("Ingrese cantidad: ");
        cantidad = scanner.nextInt();
        periferico.setCantidad(cantidad);

        // Chequeo de producto
        mostrarProducto(periferico);

        return periferico;
    }
}
