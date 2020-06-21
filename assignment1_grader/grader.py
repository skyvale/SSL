# ----------------
# PYTHON GRADER
# ----------------


# create a grader class
class Grader:
    def _init_(self): #constructor
        pass # a line that does nothing


# gets user input 
name = input("What is your name?")
assignment = input("What is the assignment name?")
grade = float(input("What is the grade?"))

# prints the user input
print("Name: " + name)
print("Assignment: " + assignment)

# function that detemines the letter grade and prints it
def letter_grade():
    if(grade >= 90):
        print("Grade: A" )
    elif(grade >= 80 and grade < 90):
        print("Grade: B" )
    elif(grade >= 70 and grade < 80):
        print("Grade: C" )
    elif(grade >= 60 and grade < 70):
        print("Grade: D" )
    elif(grade < 60):
        print("Grade: F" )
    else:
        print("Not a valid grade")

letter_grade()
