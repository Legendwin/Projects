#include <iostream>
#include <stdio.h>
using namespace std;

int num;
int numbers[sizeof(num)];

// Code to sort out the largest number from a list of numbers
int main() {
    cout << "Finding the largest number in a list of numbers" << endl;
    cout << "How many numbers are in the list: ";
    cin >> num; 

    
    int temp;
    int n;

    for (int i = 0; i < num; i++) 
    {
        cout << "Enter the numbers to sort: ";
        cin >> numbers[i];
    }

    n = numbers[0];

    for (int i = 0; i < num; i++) 
    {
        for (int j = 0; j < i; j++) 
        {
            if (numbers[j] < numbers[j + 1]) 
            {
                temp = numbers[j + 1];
                if (temp > n)
                {
                    n = temp;
                }
            }
        }
    }
    cout << "The largest number is: " << n << endl;
}