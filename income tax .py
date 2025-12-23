def calculate_2009_tax():
    print("=" * 40)
    print("   2009 FEDERAL INCOME TAX CALCULATOR")
    print("=" * 40)
    
    # Define filing statuses for clear selection
    statuses = [
        "Single", 
        "Married Filing Jointly", 
        "Married Filing Separately", 
        "Head of Household"
    ]
    
    # Display options to the user
    for i, name in enumerate(statuses):
        print(f"{i}: {name}")
    print("-" * 40)

    try:
        status = int(input("Select filing status (0-3): "))
        if status not in range(4):
            print("Invalid selection. Please run the program again.")
            return

        income = float(input(f"Enter taxable income for {statuses[status]}: $"))
    except ValueError:
        print("Input error: Please enter numeric values only.")
        return

    # Tax brackets for 2009 (Upper limits for 10%, 15%, 25%, 28%, 33%)
    # The last rate (35%) applies to anything above the last number in the list.
    brackets = [
        [8350, 33950, 82250, 171550, 372950],      # Single
        [16700, 67900, 137050, 208850, 372950],    # Married Joint
        [8350, 33950, 68525, 104425, 186475],      # Married Separate
        [11950, 45500, 117450, 190200, 372950]     # Head of Household
    ]
    
    rates = [0.10, 0.15, 0.25, 0.28, 0.33, 0.35]
    
    # Logic: Calculate tax progressively using a loop
    tax = 0.0
    remaining_income = income
    previous_limit = 0
    current_status_brackets = brackets[status]

    for i in range(len(current_status_brackets)):
        limit = current_status_brackets[i]
        rate = rates[i]
        
        if income > limit:
            # Tax the full width of this bracket
            tax += (limit - previous_limit) * rate
            previous_limit = limit
        else:
            # Tax only the remaining income and stop
            tax += (income - previous_limit) * rate
            remaining_income = 0
            break
    
    # If there is income left over the highest bracket, tax it at 35%
    if income > current_status_brackets[-1]:
        tax += (income - current_status_brackets[-1]) * rates[-1]

    # Final Output
    print("-" * 40)
    print(f"Status: {statuses[status]}")
    print(f"Income: ${income:,.22f}")
    print(f"Total Tax Owed: ${tax:,.2f}")
    print("=" * 40)

if __name__ == "__main__":
    calculate_2009_tax()
