1) Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.

* **Within a Github action that runs whenever code is pushed**

I think this is the best option for Testing in the Project Development Pipeline as this allows us to Detect the Issues and Bugs in the Code at a team level. By using Github Actions instead of local testing, we ensure that this is a step of the process that is visible to everyone and facilitates trust in the team, as it denotes to the entire group that testing has been done and the results are satisfactory to progress to merging, and if not, one of the teams can address the issues through code reviews. It also helps facilitate a consistent testing environment for the entire team, and helps track the progress over time through the commit history and version control. 

2) Would you use an end to end test to check if a function is returning the correct output? (yes/no)

**No**, as this would be more appropriate for a Unit Test, as they are more suitable for verifying the correctness of specific functions or components within the codebase. 

Whereas, End-to-End tests focus on testing the entire application flow from the user's perspective, while simulating real user interactions with the system.





