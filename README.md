# EVsForALL

## About
EV's For All is a one stop shop for everything related to Electric Cars. The primary goal of the application is close the gap present in EV adoption for under priveledged communities. We seek to encourage and empower our users, especially people from underpriveledged communities, to obtain EVs as well as educate them on the benefits of electric vehicles.

# Release Notes
----------------------------------------
## Version 0.2.0

### Features
- Vehicles displayed: Added functionality to dynamically display Electric vehicles currently on the market
- Location feature on Find Cars page: A new search bar has been added to Find Cars Page that allows Users to find cars in whatever location they enter in the search bar
- Filter and Sort: Filtering and sorting capabilities have been added to the Find Cars Page
- Cars Images: Apart from dynamically pulling cars that are currently on the markets, Images of each vehicle are now also displayed with several import specs listed.

### Bug Fixes
- Fixed all errors related to login functionality. This was done by simply removing it as it was not being used and only presented problems for the application. Can easily be added back later if the need every arises.
- Fixed bug related to have Vehicle information was being displayed on the page. Some of the information was being cut off the screen, but this is now fixed.
- Got rid of redudant pages such as the rent and lease pages. Combined the buy, rent, and lease pages into one page called Find Cars as they all displayed similar information. This simplified the UI and makes it easier to navigate the website.

### Known Issues
- Filtering: There are some issues when filtering vehicles. Specifically when filtering by brand. This should easily be fixed in next iteration
- UI Fixes: A lot of UI polishes have to be made, specifically related to different viewports. Find Cars page breaks on mobile screens still. This has to be addressed.
- Prices: Prices for vehicles were tempory removed due to issues with API from Department of Renewable Energy
- User Feedback: A lot of potential users who have seen the design have suggested that we include more images of budget friendly EV vehicles on the landing page. This one issue that we intend to address in the next iteration.

## Version 0.1.0

### Features
- Enhanced Navbar: Navbar is now responsive on pages that it present on.
- Added Mobile compatibility for navbar component: Navbar can now also be viewed on mobile device not just laptop or desktop

### Bug Fixes
- Fixed an error, where parts of the navbar were being clipped of the screen

### Known Issues
- Stock Photos: We have to remove stock photos on buy page
- Non-functional pages: We are planning on combining the buy, rent, and lease pages into one vehicles page to simplify UI and make website more functional
- Messy UI: Improving UI further and getting around to finishing implementation for vehicles page
- Authentication Bug: A bug with authentication has to be fixed for the next iteration. This should actually being fixed in the next few days.
