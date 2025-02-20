#include <iostream>
#include <ctype.h>
using namespace std;

char order;
int num;

// Program to sort numbers in ascending or descending order
int main() {
    cout << "Do you want to sort in ascending or descending order [A/D]" << endl << "NB: Not case sensitive!" << endl;
    cout << "Enter (A) for ascending or (D) for descending: ";
    cin >> order;
    order = tolower(order);

    if (order == 'a' || order == 'd') {
        cout << "How many numbers are in the list: ";
        cin >> num;

        int initial[num];
        int numbers[num];
        int temp;

        for (int i = 0; i < num; i++) {
            cout << "Enter the numbers to sort: ";
            cin >> initial[i];
            numbers[i] = initial[i];
        }

        if (order == 'a') {
            // Ascending order sorting
            for (int i = 0; i < num - 1; i++) {
                for (int j = 0; j < num - i - 1; j++) {
                    if (numbers[j] > numbers[j + 1]) {
                        temp = numbers[j];
                        numbers[j] = numbers[j + 1];
                        numbers[j + 1] = temp;
                    }
                }
            }
        } 
        else {
            // Descending order sorting
            for (int i = 0; i < num - 1; i++) {
                for (int j = 0; j < num - i - 1; j++) {
                    if (numbers[j] < numbers[j + 1]) {
                        temp = numbers[j];
                        numbers[j] = numbers[j + 1];
                        numbers[j + 1] = temp;
                    }
                }
            }
        }

        cout << "Sorted Numbers" << "           " << "Initial Numbers" << endl;
        cout << "--------------" << "           " << "---------------" << endl;
        for (int n = 0; n < num; n++) {
            cout << "    " << numbers[n] << "                      " << initial[n] << endl;
        }

    }
    else {
        cout << "Invalid Input!";
    }

    return 0;
}