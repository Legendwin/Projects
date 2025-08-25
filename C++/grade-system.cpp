#include <iostream>
using namespace std;

int score;

int main() {
    cout << "Enter your exam score: ";
    cin >> score;

    if (score < 0 || score > 100) {
        cout << "INVALID INPUT";
    }
    else if (score >= 80) {
        cout << "Grade: A" << endl << "Grade Point: 4.00";
    }
    else if (score >= 75) {
        cout << "Grade: A-" << endl << "Grade Point: 3.75";
    }
    else if (score >= 70) {
        cout << "Grade: B+" << endl << "Grade Point: 3.50";
    }
    else if (score >= 65) {
        cout << "Grade: B" << endl << "Grade Point: 3.25";
    }
    else if (score >= 60) {
        cout << "Grade: B-" << endl << "Grade Point: 3.00";
    }
    else if (score >= 55) {
        cout << "Grade: C+" << endl << "Grade Point: 2.75";
    }
    else if (score >= 50) {
        cout << "Grade: C" << endl << "Grade Point: 2.50";
    }
    else if (score >= 45) {
        cout << "Grade: C-" << endl << "Grade Point: 2.00";
    }
    else if (score >= 40) {
        cout << "Grade: D" << endl << "Grade Point: 1.50";
    }
    else {
        cout << "Grade: F" << endl << "Grade Point: 0.00";
    }
    return 0;
}