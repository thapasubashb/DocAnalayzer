import java.util.Scanner;

public class HelloWorld {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the first number: ");
        int a = sc.nextInt();
        System.out.println("enter the secound number:");
        int b = sc.nextInt();
        int result = a + b;
        
        if(result == 45){
            System.out.println("Yes, the sum result is correct and it is " + result);
        } else {
            System.out.println("The sum result is not right and it should have been " + result);
        }
    }
}
