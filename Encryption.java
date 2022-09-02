import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Encryption {
    public static void main(String[] args) throws FileNotFoundException {
        String pwd = "";
        // Leer archivo local
        File texto = new File("./Example.txt");
        Scanner obj = new Scanner(texto);
        while(obj.hasNextLine()){
            pwd += obj.nextLine();
        }
        
        // Password creation
        double[] encryptedPwd = new double[pwd.length()];
        char[] dencryptedPwd = new char[pwd.length()];

        // Threaded password encryption
        long startTime = System.nanoTime();
		ForkJoinPool pool = new ForkJoinPool();
		Encrypter encrypter = new Encrypter(pwd, encryptedPwd, 0, pwd.length());
		pool.invoke(encrypter);
       
        // Threaded password decryption
        Decryptor app2 = new Decryptor(dencryptedPwd, encryptedPwd, 0, pwd.length()); 
		pool.invoke(app2);
        long endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);
        /*
        System.out.println("Contraseña original:"+pwd);
        System.out.print("Contraseña 'encriptada':");
        for(int i = 0; i < pwd.length(); i++){
            System.out.print((char)(encryptedPwd[i]%255)); 
        }
        System.out.println();
        System.out.println("Contraseña desencriptada: "+ new String(dencryptedPwd));
         */

        // Single-threaded password encryption
        startTime = System.nanoTime();
        for(int i = 0; i < pwd.length(); i++){
            encryptedPwd[i] = f((double)pwd.charAt(i));
        }
        for(int i = 0; i < encryptedPwd.length; i++){
            dencryptedPwd[i] = (char)f2(encryptedPwd[i]);
        }
        endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);
        
        /* 
        System.out.println("Contraseña original:"+pwd);
        System.out.print("Contraseña 'encriptada':");
        for(int i = 0; i < pwd.length(); i++){
            System.out.print((char)(encryptedPwd[i]%255)); 
        }
        System.out.println();
        System.out.println("Contraseña desencriptada: "+ new String(dencryptedPwd));
        */
        
	}
    static double f(double x){
        return Math.pow(4*x+7,80);
    }
    static double f2(double x){
        return (Math.pow(x,0.0125)-7)/4;
    }
}
class Encrypter extends RecursiveAction {
    final int threshold = 10000;
    int start, end;
    double[] encryptedPwd;
    String pwd;

    Encrypter(String pwd, double[] encryptedPwd, int start, int end) {
        this.start = start;
        this.end = end;
        this.encryptedPwd = encryptedPwd;
        this.pwd = pwd;
    }

    @Override
    protected void compute() {
        if((end - start) < threshold){
            for(int i = start; i < end; i++){
                encryptedPwd[i] = f((double)pwd.charAt(i));
            }
        }else {
            int mid = (start + end)/2;
            invokeAll(new Encrypter(pwd, encryptedPwd, start, mid), new Encrypter(pwd, encryptedPwd, mid, end));
        }
    }

    static double f(double x){
        return Math.pow(4*x+7,80);
    }
}

class Decryptor extends RecursiveAction {
    final int threshold = 10000;
    int start, end;
    double[] encryptedPwd;
    char[] dencryptedPwd;

    Decryptor(char[] dencryptedPwd, double[] encryptedPwd, int start, int end) {
        this.start = start;
        this.end = end;
        this.encryptedPwd = encryptedPwd;
        this.dencryptedPwd = dencryptedPwd;
    }

    /* (non-Javadoc)
     * @see java.util.concurrent.RecursiveAction#compute()
     */
    @Override
    protected void compute() {
        if((end - start) < threshold){
            for(int i = start; i < end; i++){
                dencryptedPwd[i] = (char)f(encryptedPwd[i]);
            }
        }else {
            int mid = (start + end)/2;
            invokeAll(new Decryptor(dencryptedPwd, encryptedPwd, start, mid),new Decryptor(dencryptedPwd, encryptedPwd, mid, end));
        }
    }

    static double f(double x){
        return (Math.pow(x,0.0125)-7)/4;
    }
}
