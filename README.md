Tiggzi-click-to-dial-part-1
===========================

Facebook integration

This demo demonstrait Tiggzy integration with Facebook. There are 3 screens:

1. mobilescreen1.html - A button which start the connection to Facebook
2. mobliescreen2.html - After login to facebook a list of your friends and thier phone number or your phone number.
3. popup1.html - A pop up for update your/your friends phones.

The live demo can be found under

http://tiggzi.com/view/25c969c6-3c0e-4ee1-a09e-54a7a042b19f/mob-mobilescreen1.html 

All the relevant files can be found under

https://github.com/chenfli/Tiggzi-click-to-dial-part-1/tree/master/Click_To_Dial/assets/www

For each page you can see the layout (html,css) and thier relevant javascript code which trigger

only person.js is used to init friends details and used on mobilescreen2.html, a workaround of tiggzi bug.


The 2nd page continues when you click on your friends phone into Tiggzi-click-to-dial-part-2. Your phone and the
selected friend are the input of the first page on Tiggzi-click-to-dial-part-2. 

The flow is:

mobilescreen1 --> FB --> mobilescreen2 -- click on your friend phone --> Foundry API -- Redirect with the 2 phones --> Tiggzi-click-to-dial-part-2 Result.html
            