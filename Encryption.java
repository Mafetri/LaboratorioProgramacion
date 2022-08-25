import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;
import java.util.Arrays;

public class Encryption {
    public static void main(String[] args) {
        // Password creation
		//String contraseña = "Lorem ipsum dolor sit amet";
        //char[] password = new char[contraseña.length()];
        //password = contraseña.toCharArray();
        //System.out.println(new String(password));


        double[] password = new double[10000000];
        for(int i = 0; i < password.length; i++) {
            password[i] = 323489;
        }

        // Threaded password encryption
        long startTime = System.nanoTime();
		ForkJoinPool pool = new ForkJoinPool();
		Encrypt app = new Encrypt(password, 0, password.length);
		pool.invoke(app);
        Dencrypt app2 = new Dencrypt(password, 0, password.length);
		pool.invoke(app2);
        long endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);

        // Single-threaded password encryption
        startTime = System.nanoTime();
        for(int i = 0; i < password.length; i++){
            double j = (f((int)password[i]));
        }
        for(int i = 0; i < password.length; i++){
            double j = f2((int)password[i]);
        }
        endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);
	}
    static int f(int x){
        return (int)Math.pow(4*x+7,80);
    }
    static int f2(int x){
        return (int)(Math.pow(x,0.0125)-7)/4;
    }

}
class Encrypt extends RecursiveAction {
    final int threshold = 1000;
    int start, end;
    double[] password;
    Encrypt(double[] password, int start, int end) {
        this.start = start;
        this.end = end;
        this.password = password;
    }

    @Override
    protected void compute() {
        if((end - start) < threshold){
            for(int i = start; i < end; i++){
                password[i] = f(password[i]);
            }
        }else {
            int mid = (start + end)/2;
            invokeAll(new Encrypt(password, start, mid),new Encrypt(password, mid, end));
        }
    }

    static double f(double x){
        return Math.pow(4*x+7,80);
    }
}

class Dencrypt extends RecursiveAction {
    final int threshold = 1000;
    int start, end;
    double[] password;
    Dencrypt(double[] password, int start, int end) {
        this.start = start;
        this.end = end;
        this.password = password;
    }

    @Override
    protected void compute() {
        if((end - start) < threshold){
            for(int i = start; i < end; i++){
                password[i] = f(password[i]);
            }
        }else {
            int mid = (start + end)/2;
            invokeAll(new Dencrypt(password, start, mid),new Dencrypt(password, mid, end));
        }
    }

    static double f(double x){
        return (Math.pow(x,0.0125)-7)/4;
    }
}
