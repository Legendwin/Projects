#include <iostream>
using namespace std;

int main() {
    string input;
    cout << "Enter a string: ";
    cin >> input;

    int len = input.size();
    for (char l : input) {
        char letter = tolower(l);
        if (letter == 'a') {
            cout << "1";
        }
        else if (letter == 'b') {
            cout << "2";
        }
        else if (letter == 'c') {
            cout << "3";
        }
        else if (letter == 'd') {
            cout << "4";
        }
        else if (letter == 'e') {
            cout << "5";
        }
        else if (letter == 'f') {
            cout << "6";
        }
        else if (letter == 'g') {
            cout << "7";
        }
        else if (letter == 'h') {
            cout << "8";
        }
        else if (letter == 'i') {
            cout << "9";
        }
        else if (letter == 'j') {
            cout << "10";
        }
        else if (letter == 'k') {
            cout << "11";
        }
        else if (letter == 'l') {
            cout << "12";
        }
        else if (letter == 'm') {
            cout << "13";
        }
        else if (letter == 'n') {
            cout << "14";
        }
        else if (letter == 'o') {
            cout << "15";
        }
        else if (letter == 'p') {
            cout << "16";
        }
        else if (letter == 'q') {
            cout << "17";
        }
        else if (letter == 'r') {
            cout << "18";
        }
        else if (letter == 's') {
            cout << "19";
        }
        else if (letter == 't') {
            cout << "20";
        }
        else if (letter == 'u') {
            cout << "21";
        }
        else if (letter == 'v') {
            cout << "22";
        }
        else if (letter == 'w') {
            cout << "23";
        }
        else if (letter == 'x') {
            cout << "24";
        }
        else if (letter == 'y') {
            cout << "25";
        }
        else if (letter == 'z') {
            cout << "26";
        }
        else {
            cout << "ERROR";
        }
    }
}