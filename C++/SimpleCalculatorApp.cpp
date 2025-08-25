#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

// Function prototypes
void show_calc();
void show_output(double);

int main () {
    double num1 = 0.0, num2 = 0.0, ans = 0.0;
    char operation = '\n';
    bool converter = 0;

    // Taking input from user
    //show_calc();
    while (operation != '.') {
        if (converter == 1) { //To display the output
            show_output(ans);
            // Prompt for next operation
            cout << "\nEnter operation: ";
            cin >> operation;

            // Taking input from the user based on operation
            if (operation == '+' || operation == '-' || operation == '*' || operation == '/') {
                num1 = ans;
                cout << "Enter next number: ";
                cin >> num2;
            }
            else if (operation == 'k' || operation == '.') {
                // Do nothing
            }
            else {
                num1 = ans;
            }
        }
        else { // To display the calculator
            show_calc();
            cout << "\nEnter operation: ";
            cin >> operation;

            // Taking input from the user based on operation
            if (operation == '+' || operation == '-' || operation == '*' || operation == '/') {
                cout << "Enter number: ";
                cin >> num1;
                cout << "Enter next number: ";
                cin >> num2;
            }
            else if (operation == 'k' || operation == '.') {
                // Do nothing
            }
            else {
                cout << "Enter number: ";
                cin >> num1;
            }

            converter = 1;
        }

        switch (operation) {
            case '+':
                ans = num1 + num2;
                break;
            case '-':
                ans = num1 - num2;
                break;
            case '*':
                ans = num1 * num2;
                break;
            case '/':
                if (num2 == 0) {
                    cout << "Error: Division by zero is not allowed." << endl;
                    ans = 0;
                } 
                else {
                    ans = num1 / num2;
                }
                break;
            case 's':
                ans = pow(num1, 2);
                break;
            case 'r':
                if (num1 < 0) {
                    cout << "Error: Square root of negative number is undefined." << endl;
                    ans = 0;
                } 
                else {
                    ans = sqrt(num1);
                }
                break;
            case 'k':
                converter = 0;
                ans = 0;
                break;
            case '.':
                cout << "Thank you for using our app.";
                break;
            default:
                cout << "~~~~Invalid input!~~~~" << endl;
        }
    }
    
    return 0;
}

// Function for calculator interface
void show_calc() {
    cout << " _________________________________________________" << endl;
    cout << "|---                                           ---|" << endl;
    cout << "|-                    SIMPLE                     -|" << endl;
    cout << "|-                  CALCULATOR                   -|" << endl;
    cout << "|---                                           ---|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     k     |     s     |     r     |     +     -|" << endl;
    cout << "|-   CLEAR   |   SQUARE  |  SQ ROOT  |    ADD    -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     7     |     8     |     9     |     -     -|" << endl;
    cout << "|-           |           |           |   MINUS   -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     4     |     5     |     6     |     *     -|" << endl;
    cout << "|-           |           |           |  MULTIPLY -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     1     |     2     |     3     |     /     -|" << endl;
    cout << "|-           |           |           |   DIVIDE  -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     0     |           |           |     .     -|" << endl;
    cout << "|-           |           |           |   CLOSE   -|" << endl;
    cout << "|_________________________________________________|" << endl;
}

// Function for calculator output interface
void show_output(double ans) {
    cout << " _________________________________________________" << endl;
    cout << "|---                   ---------------------------|" << endl;
    cout << "|-     CURRENT        |" << "                           |" << endl;
    cout << "|-     OUTPUT IS:     |" << setw(25) << ans << "  |" << endl;
    cout << "|---                   ---------------------------|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     k     |     s     |     r     |     +     -|" << endl;
    cout << "|-   CLEAR   |   SQUARE  |  SQ ROOT  |    ADD    -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     7     |     8     |     9     |     -     -|" << endl;
    cout << "|-           |           |           |   MINUS   -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     4     |     5     |     6     |     *     -|" << endl;
    cout << "|-           |           |           |  MULTIPLY -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     1     |     2     |     3     |     /     -|" << endl;
    cout << "|-           |           |           |   DIVIDE  -|" << endl;
    cout << "|-------------------------------------------------|" << endl;
    cout << "|-     0     |           |           |     .     -|" << endl;
    cout << "|-           |           |           |   CLOSE   -|" << endl;
    cout << "|_________________________________________________|" << endl;
}