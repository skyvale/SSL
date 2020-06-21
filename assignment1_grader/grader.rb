
# --------------
# Ruby Grader
# --------------


# create a grader class
class Grader 
    puts "This is generic Ruby class"
end


# get user input 
puts "What is your name?"
name = gets

puts "What is the assignment?"
assignment = gets

puts "What is the grade?"
grade = gets
grade = grade.to_f


# print user input
print "Name: " + name
print "Assignment: " + assignment

# function that detemines the letter grade and prints it
def letterGrade(grade)
    if(grade >= 90)
        print("gradeParse: A")
    elsif(grade >= 80 && grade < 90)
        print("Grade: B")
    elsif(grade >= 70 && grade < 80)
        print("Grade: C")
    elsif(grade >= 60 && grade < 70)
        print("Grade: D")
    elsif(grade < 60)
        print("Grade: F")
    else
        print("Not a valid grade")
    end
end
        
letterGrade(grade)


