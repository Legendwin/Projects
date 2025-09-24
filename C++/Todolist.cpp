#include <iostream>
#include <vector>
using namespace std;

int main() {
    int option;
    vector<string> Todo;
    string todo;
    while (option != 4) {
        cout << "ToDo List App" << endl;
        cout << "1. Enter new todo" << endl;
        cout << "2. View my todo list" << endl;
        cout << "3. Delete todo entry" << endl;
        cout << "4. Quit" << endl;
        cout << "Enter an option [1-4]: ";
        cin >> option;
        cin.ignore();
        cout << endl;

        if (option == 1) {
            cout << "Enter your new todo: ";
            getline(cin, todo);
            Todo.push_back(todo);
            cout << "Todo added!\n" << endl;
            continue;
        }
        else if (option == 2) {
            for (int i = 0; i < Todo.size(); i++) {
                cout << i + 1 << "- " << Todo[i] << endl << endl;
            }
            continue;
        }
        else if (option == 3) {
            int num;
            cout << "Enter the number of the todo you want to delete: ";
            cin >> num;
            if (num < 1 || num > Todo.size()) {
                cout << "Invalid todo number!\n" << endl;
                continue;
            }

            Todo.erase(Todo.begin() + (num - 1));
            cout << "Todo deleted!" << endl;
            cin.ignore();
            cout << endl;
            continue;
        }
        else if (option == 4) {
            cout << "Thank you for using our app.";
            break;
        }
        else {
            cout << "Invalid option!\nTry again.";
            cout << endl;
            cin.ignore();
            continue;
        }
        cout << endl;
    }
    
    return 0;
}