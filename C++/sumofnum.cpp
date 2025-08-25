#include <iostream>
using namespace std;

int num;
int numbers[sizeof(num)];  
int sum;
int i;
int j;

int main() 
{
    cout << "How many numbers do you want to sum up: ";
    cin >> num;

    for (int i = 0; i < num; i++) {
        cout << "Enter number " << i + 1 <<": ";
        cin >> numbers[i];
        sum += numbers[i];

        cout << "sum: " << sum << endl;
    }
    
    cout << "The sum of the numbers is: " << sum;  
}