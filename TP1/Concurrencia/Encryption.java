package Concurrencia;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Encryption {
    public static void main(String[] args) throws FileNotFoundException {
        String aEncriptar = "";
        // Leer archivo local
        File texto = new File("TP1/Concurrencia/Example.txt");
        Scanner scanner = new Scanner(texto);
        while(scanner.hasNextLine()){
            aEncriptar += scanner.nextLine();
        }
        
        // Arreglos a trabajar
        double[] encriptado = new double[aEncriptar.length()];
        char[] desencriptado = new char[aEncriptar.length()];

        // Pool de trabajo
        ForkJoinPool pool = new ForkJoinPool();

        // Recursive Action
        encriptacionRecursiveAction(pool, aEncriptar, encriptado);
        desencriptacionRecursiveAction(pool, encriptado, desencriptado);

        // Lineal
        encriptacionLineal(aEncriptar, encriptado);
        lineal(encriptado, desencriptado);
	}

    // ========= Recursive Action =========
    //  ---- Encriptacion con RecursiveAction ---- 
    static void encriptacionRecursiveAction(ForkJoinPool pool, String aEncriptar, double[] encriptado){
        // Encriptacion mediante RecursiveAction 
        long tiempoInicio = System.nanoTime();
        Encriptador encriptador = new Encriptador(aEncriptar, encriptado, 0, aEncriptar.length());
        pool.invoke(encriptador);
        long tiempoFinal = System.nanoTime();
        System.out.println("Tiempo encriptacion con RecursiveAction: \n" + (tiempoFinal - tiempoInicio)/100000);
    }

    //  ---- Desencriptacion con RecursiveAction ---- 
    static void desencriptacionRecursiveAction(ForkJoinPool pool, double[] encriptado, char[] desencriptado){
        long tiempoInicio = System.nanoTime();
        Desencriptador desencriptador = new Desencriptador(desencriptado, encriptado, 0, encriptado.length); 
        pool.invoke(desencriptador);
        long tiempoFinal = System.nanoTime();
        System.out.println("Tiempo desencriptacion con RecursiveAction: \n" + (tiempoFinal - tiempoInicio)/100000);
    }

    // ========= Lineal =========
    // ---- Encriptacion Lineal ----
    static void encriptacionLineal(String aEncriptar, double[] encriptado){
        long tiempoInicio = System.nanoTime();
        for(int i = 0; i < aEncriptar.length(); i++){
            encriptado[i] = funcion((double)aEncriptar.charAt(i));
        }
        long tiempoFinal = System.nanoTime();
        System.out.println("Tiempo encriptacion lineal: \n" + (tiempoFinal - tiempoInicio)/100000);
    }

    // ---- Desencriptacion Lineal ----
    static void lineal(double[] encriptado, char[] desencriptado){
        long tiempoInicio = System.nanoTime();
        for(int i = 0; i < encriptado.length; i++){
            desencriptado[i] = (char)funcionInversa(encriptado[i]);
        }
        long tiempoFinal = System.nanoTime();
        System.out.println("Tiempo desencriptacion lineal: \n" + (tiempoFinal - tiempoInicio)/100000);
    }

    // ---- Funciones para el encriptado ----
    static double funcion(double x){
        return Math.pow(4*x+7,80);
    }
    static double funcionInversa(double x){
        return (Math.pow(x,0.0125)-7)/4;
    }

     // // ========= Chequeo de Encriptacion =========-
     static void imprimirOriginal(String aEncriptar){
        System.out.println("Texto original: \n"+aEncriptar);
    }
    static void imprimirEncriptado(double[] encriptado){
        System.out.print("Texto encriptado: \n");
        for(int i = 0; i < encriptado.length; i++){
            System.out.print((char)(encriptado[i]%255)); 
        }
    }
    static void imprimirDesencriptado(char[] desencriptado){
        System.out.println("Contraseña desencriptada: \n"+ new String(desencriptado));
    }
}

class Encriptador extends RecursiveAction {
    final int limite = 10000;
    int inicio, fin;
    double[] encriptado;
    String aEncriptar;

    Encriptador(String aEncriptar, double[] encriptado, int inicio, int fin) {
        this.inicio = inicio;
        this.fin = fin;
        this.encriptado = encriptado;
        this.aEncriptar = aEncriptar;
    }

    @Override
    protected void compute() {
        // Si se llega al limite de posiciones del arreglo, se resuelve su parte, sino divide el trabajo y crea tareas
        if((fin - inicio) < limite){
            for(int i = inicio; i < fin; i++){
                encriptado[i] = f((double)aEncriptar.charAt(i));
            }
        }else {
            int mid = (inicio + fin)/2;
            invokeAll(new Encriptador(aEncriptar, encriptado, inicio, mid), new Encriptador(aEncriptar, encriptado, mid, fin));
        }
    }

    static double f(double x){
        return Math.pow(4*x+7,80);
    }
}

class Desencriptador extends RecursiveAction {
    final int limite = 10000;
    int inicio, fin;
    double[] encriptado;
    char[] desencriptado;

    Desencriptador(char[] desencriptado, double[] encriptado, int inicio, int fin) {
        this.inicio = inicio;
        this.fin = fin;
        this.encriptado = encriptado;
        this.desencriptado = desencriptado;
    }

    @Override
    protected void compute() {
        // Si se llega al limite de posiciones del arreglo, se resuelve su parte, sino divide el trabajo y crea tareas
        if((fin - inicio) < limite){
            for(int i = inicio; i < fin; i++){
                desencriptado[i] = (char)f(encriptado[i]);
            }
        }else {
            int mid = (inicio + fin)/2;
            invokeAll(new Desencriptador(desencriptado, encriptado, inicio, mid),new Desencriptador(desencriptado, encriptado, mid, fin));
        }
    }

    static double f(double x){
        return (Math.pow(x,0.0125)-7)/4;
    }
}
