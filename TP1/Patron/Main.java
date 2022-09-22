package Patron;
import java.util.Scanner;
import Patron.Factories.*;
import Patron.Perifericos.*;
import java.util.ArrayList;

public class Main {
    // Creamos las Fabricas
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
                    // Creamos el producto y lo agregamos al inventario
                    inventario.add(crearProducto()); 
                    break;
                case 2: 
                    // Buscamos el producto y lo mostramos
                    System.out.println("Ingrese modelo: "); 
                    modelo = scanner.next();
                    mostrarProducto(buscarProducto(inventario, modelo)); 
                    break;
                case 3:
                    // Mostramos las clases de los ojbetos contenidos en el arreglo
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
            // Si el periferico no es nulo mostramos sus atributos
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
    public static Periferico buscarProducto(ArrayList<Periferico> inventario, String modelo){
        Periferico resultado = null;
        for (int i = 0; i < inventario.size(); i++) {
            // Recorremos el arreglo hasta encontrar el modelo que estamos buscando
            if(inventario.get(i).getModelo().equalsIgnoreCase(modelo)){
                resultado = inventario.get(i);
            }
        }
        return resultado;
    }

    // ---- Mostrar clases de productos ----
    public static void mostrarClases(ArrayList<Periferico> inventario){
        for (int i = 0; i < inventario.size(); i++) {
            if(inventario.get(i) != null){ 
                // Recorremos el arreglo y mostramos de que claso es cada periferico
                System.out.print("-> " + i + ": ");
                System.out.println(inventario.get(i).getClase());
            }
        }
    }

    // ---- Ingresar Producto ----
    public static Periferico crearProducto(){
        String tipo;
        Periferico resultado = null;
        Scanner scanner = new Scanner(System.in); 

        System.out.println("Ingrese tipo: ");
        tipo = scanner.next();
        // Creamos el periferico en la fabrica correspondiente segun la eleccion del usuario
        switch(tipo.toUpperCase()) { 
            // Si elige un periferico de CONSOLA enviamos la fabrica CONSOLA por parametro
            case "CONSOLA" : resultado = constructorProducto(ConsolaFactory); break; 
            // Si elige un periferico de PC enviamos la fabrica PC por parametro
            case "PC" : resultado = constructorProducto(PCFactory); break;
            default : System.out.println("ERROR!");
        }

        return resultado;
    }

    // ===== Constructor de perifericos =====
    // La clase del periferico a retornar depende de la fabrica enviada por parametro.
    public static Periferico constructorProducto(AbstractFactory fabrica){
        // Variables
        Scanner scanner = new Scanner(System.in); 
        String tipo, modelo, marca;
        int precio, cantidad;
        Periferico periferico = null;

        // Ingreso de Datos
        while(periferico == null){
            // El usuario elige que periferico desea crear
            System.out.println("Ingrese periferico: "); 
            tipo = scanner.nextLine();
            
            // Creacion de periferico solicitado
            switch(tipo.toUpperCase()){
                case "TECLADO" : periferico = fabrica.crearTeclado(); break;
                case "MOUSE" : periferico = fabrica.crearMouse(); break;
                case "AURICULAR" : periferico = fabrica.crearAuriculares(); break;
                case "AURICULARES" : periferico = fabrica.crearAuriculares(); break;
            }
    
            // Si periferico es null, entonces hubo un error
            if(periferico == null){
                System.out.println("ERROR!");
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
