# Mono Web Publish
mwp is a small tool used to publish your Mono ASP.NET website after you've build it with xbuild. It mimics the behavior of 
Microsoft Web Deploy, and creates a deployable package under the obj dir in your project folder.

<img src="http://blog.jetbrains.com/teamcity/files/2015/12/icon_TeamCity.png" height="25" width="25">
If you're using JetBrains TeamCity on a non-windows server like me, you can use this tool to package your website into an 
artifact almost the same way you would do it on a Microsoft Windows server using Microsoft Web Deploy.

Normally you would have the following build-steps on a Microsoft Windows server(With Microsoft Web Deploy installed):
<ol>
  <li>Build solution, using MSBuild</li>
  <li>Package website, using MSBuild on projectfile with Targets=Package</li>
</ol>
On a non-windows server using mwp:
<ol>
  <li>Build solution, using Mono xbuild</li>
  <li>Package website, using a command-line where you run mwp like this:
   <pre><code>
      node ~/bin/mwp.js %system.Configuration% %teamcity.build.workingDir%/SolutionName/ProjectName.csproj
   </code></pre>
  </li>
</ol>

That way you can later add the website to your artifact same way you would add it on a TeamCity Server running on Microsoft Windows:
<pre><code>
ProjectName/obj/%system.Configuration%/Package/PackageTmp => SolutionName_%system.build.number%.zip!/ProjectName/
</code></pre>

# License
mwp is available under the [BSD license](https://opensource.org/licenses/BSD-3-Clause).
