public class SquareExampleWR {
	public static void main(String[] args) {
		int [] data = {1,2,3,4,5,6,7,8,9,10};
        int result = 0;
        for(int i = 0; i < data.length; i++){
            result += data[i] * data[i];
        }
		System.out.println(result);
	}
}