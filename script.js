// Math Functions
  // acos but in degrees
  function acos(x) {
    return ((Math.acos(x)*180)/Math.PI)
  }
  // asin but in degrees
  function asin(x) {
    return ((Math.asin(x)*180)/Math.PI)
  }
  // converts degrees to radians
  function rad(deg) {
    return (deg*(Math.PI / 180))
  }      
// Runs once submit button is clicked
function submit() {
  // Fetches values of input fields
  let s1 = document.getElementById("s1")
  let s2 = document.getElementById("s2")
  let s3 = document.getElementById("s3")
  let a1 = document.getElementById("a1")
  let a2 = document.getElementById("a2")
  let a3 = document.getElementById("a3")
  if ((s1.value == "")) {
    alert("Please enter a value for side 1")
    return
  }
  let deg = "°"
  let n = "\n"
  let copy = ""
  let sides = 0
  let angles = 0
  let tcase = ""
  let twoCase = false
  let list = [s1,s2,s3,a1,a2,a3]
  let [a,b,c,A,B,C] = [s1,s2,s3,a1,a2,a3]
  if (s1!="") {
    a = Number(s1.value)
  }
  if (s2!="") {
    b = Number(s2.value)
  }
  if (s3!="") {
    c = Number(s3.value)
  }
  if (a1!="") {
    A = Number(a1.value)
  }
  if (a2!="") {
    B = Number(a2.value)
  }
  if (a3!="") {
    C = Number(a3.value)
  }
  let [aa,bb,cc,AA,BB,CC] = ["","","","","",""]
  let given = {}
  for (x of list) {
    if (x.value != "") {
      if (x.className == "side") {
        given[x.id] = x.value
        sides+=1
      } else if (x.className == "angle") {
        given[x.id] = x.value
        angles+=1
      } else {
        alert("Error: Class Undefined")
      }
    }
  }
  if (sides == 3) {
    // Triangle Inequality Theorem
    if (!((a+b>c)&&(b+c>a)&&(a+c>b))) {
      alert("Impossible Values")
      return
    }
  }
  if ((sides == 0 & angles <= 3) || (sides < 3 & angles == 0) || (sides == 1 && angles == 1)) {
    // Not Enough Information
    alert("Insufficient information to solve")
    return
  } else if ((sides == 3) && (angles >= 0)) {
    // SSS Case
    tcase = "SSS"
    // Law of Cosines
    C = acos((a**2+b**2-c**2)/(2*a*b))
    // alert((a**2+b**2-c**2)/(2*a*b))
    // Law of Sines
    B = asin((Math.sin(rad(C))/c)*b)
    // Triangle Sum Theorem
    A = 180-B-C
  } else if ((sides == 1) && (angles > 1)) {
    // SAA/AAS/ASA Case
    if (A=="") {
      tcase="ASA"
    } else {
      tcase="SAA"
    }
    // Triangle Sum Theorem
    if (A=="") {
      A = (180-B)-C
    } else if (B=="") {
      B = (180-A)-C
    } else if (C=="") {
      C = (180-A)-B
    }
    // Law of Sines
    b = (a/Math.sin(rad(A)))*Math.sin(rad(B))
    c = (a/Math.sin(rad(A)))*Math.sin(rad(C))
  } else if ((sides == 2) && (angles > 0)) {
    if (((b=="") && (B!="")) || ((c=="") && (C!=""))) {
      // SAS Case
      tcase = "SAS"
      // Law of Cosines
      if (b=="") {
        b = Math.sqrt((a**2+c**2)-(2*a*c*Math.cos(rad(B))))
        // alert(Math.cos(rad(B)))
        // Law of Sines
        A = asin((Math.sin(rad(B))/b)*a)
        // Triangle Sum Theorem
        C = 180-A-B
      } else if (c=="") {
        c = Math.sqrt((a**2+b**2)-(2*a*b*Math.cos(rad(C))))
        // Law of Sines
        A = asin((Math.sin(rad(C))/c)*a)
        // Triangle Sum Theorem
        B = 180-A-C
      } else {
        alert("Error")
        return
      }
    } else {
      // SSA Case (One or Ambiguous)
      if (A!="") {
        if (b!="") {
          if ((A>90) || (a>b)) {
            tcase="SSA (One)"
          } else {
            tcase="SSA (Ambiguous)"
            twoCase=true
          }
        } else if (c!="") {
          if ((A>90) || (a>c)) {
            tcase="SSA (One)"
          } else {
            tcase="SSA (Ambiguous)"
            twoCase=true
          }
        }
      } else if (B!="") {
        if ((B>90) || (b>a)) {
          tcase="SSA (One)"
        } else {
          tcase="SSA (Ambiguous)"
          twoCase=true
        }
      } else if (C!="") {
        if ((C>90) || (c>a)) {
          tcase="SSA (One)"
        } else {
          tcase="SSA (Ambiguous)"
          twoCase=true
        }
      }
      // Case 1
      if ((b!="") && (A!="")) {
        // Law of Sines
        B = asin((Math.sin(rad(A))/a)*b)
        if (isNaN(B)) {
          alert("Impossible Values")
          return
        }
        if (twoCase) {
          AA=A
          aa=a
          bb=b
          BB = 180-asin((Math.sin(rad(A))/a)*b)
        }
          // Triangle Sum Theorem
          C = 180-A-B
          if (twoCase) {
            CC = 180-A-BB
          }
        c = (a/Math.sin(rad(A)))*Math.sin(rad(C))
        if (twoCase) {
          cc = (a/Math.sin(rad(A)))*Math.sin(rad(CC))
        }
      } else if ((b!="") && (B!="")) {
        // Law of Sines
        A = asin((Math.sin(rad(B))/b)*a)
        if (isNaN(C)) {
          alert("Impossible Values")
          return
        }
        if (twoCase) {
          BB=B
          aa=a
          bb=b
          AA = 180-asin((Math.sin(rad(B))/b)*a)
        }
          // Triangle Sum Theorem
          C = 180-A-B
          if (twoCase) {
            CC = 180-AA-B
          }
        c = (a/Math.sin(rad(A)))*Math.sin(rad(C))
        if (twoCase) {
          cc = (a/Math.sin(rad(A)))*Math.sin(rad(CC))
        }
      } else if ((c!="") && (A!="")) {
          // Law of Sines
          C = asin((Math.sin(rad(A))/a)*c)
          if (isNaN(C)) {
            alert("Impossible Values")
            return
          }
          if (twoCase) {
            AA=A
            aa=a
            cc=c
            CC = 180-asin((Math.sin(rad(A))/a)*c)
          }
            // Triangle Sum Theorem
            B = 180-A-C
            if (twoCase) {
              BB = 180-A-CC
            }
          b = (a/Math.sin(rad(A)))*Math.sin(rad(B))
          if (twoCase) {
            bb = (a/Math.sin(rad(A)))*Math.sin(rad(BB))
          }
      } else if ((c!="") && (C!="")) {
        // Law of Sines
        A = asin((Math.sin(rad(C))/c)*a)
        if (isNaN(A)) {
          alert("Impossible Values")
          return
        }
        if (twoCase) {
          CC=C
          aa=a
          cc=c
          AA = 180-asin((Math.sin(rad(C))/c)*a)
        }
          // Triangle Sum Theorem
          B = 180-A-C
          if (twoCase) {
            BB = 180-A-CC
          }
        b = (a/Math.sin(rad(A)))*Math.sin(rad(B))
        if (twoCase) {
          bb = (a/Math.sin(rad(A)))*Math.sin(rad(BB))
        }
      }
    }
  }
  // Rounds to nearest thousandth
  if (!Number.isInteger(a)) {
    a = a.toFixed(3)
    if (String(a).slice(-3) == "000") {
      a = Math.trunc(a)
    }
  }
  if (!Number.isInteger(b)) {
    b = b.toFixed(3)
    if (String(b).slice(-3) == "000") {
      b = Math.trunc(b)
    }
  }
  if (!Number.isInteger(c)) {
    c = c.toFixed(3)
    if (String(c).slice(-3) == "000") {
      c = Math.trunc(c)
    }
  }
  if (!Number.isInteger(A)) {
    A = A.toFixed(3)
    if (String(A).slice(-3) == "000") {
      A = Math.trunc(A)
    }
  }
  if (!Number.isInteger(B)) {
    B = B.toFixed(3)
    if (String(B).slice(-3) == "000") {
      B = Math.trunc(B)
    }
  }
  if (!Number.isInteger(C)) {
    C = C.toFixed(3)
    if (String(C).slice(-3) == "000") {
      C = Math.trunc(C)
    }
  }
  if (twoCase) {
    if (!Number.isInteger(aa)) {
      aa = aa.toFixed(3)
      if (String(aa).slice(-3) == "000") {
        aa = Math.trunc(aa)
      }
    }
    if (!Number.isInteger(bb)) {
      bb = bb.toFixed(3)
      if (String(bb).slice(-3) == "000") {
        bb = Math.trunc(bb)
      }
    }
    if (!Number.isInteger(cc)) {
      cc = cc.toFixed(3)
      if (String(cc).slice(-3) == "000") {
        cc = Math.trunc(cc)
      }
    }
    if (!Number.isInteger(AA)) {
      AA = AA.toFixed(3)
      if (String(AA).slice(-3) == "000") {
        AA = Math.trunc(AA)
      }
    }
    if (!Number.isInteger(BB)) {
      BB = BB.toFixed(3)
      if (String(BB).slice(-3) == "000") {
        BB = Math.trunc(BB)
      }
    }
    if (!Number.isInteger(CC)) {
      CC = CC.toFixed(3)
      if (String(CC).slice(-3) == "000") {
        CC = Math.trunc(CC)
      }
    }
  }
  if (!twoCase) {
    if (confirm("**Case: "+tcase+"**"+n+"a: "+a+n+"b: "+b+n+"c: "+c+n+"α: "+A+deg+n+"β: "+B+deg+n+"γ: "+C+deg+n+n+"Copy results to clipboard?")) {
      copy = prompt("Type 'a', 'b', 'c', 'A', 'B', or 'C' to copy values (click cancel when done)")
      while (true) {
        let copiedText = "Copied!\n\n"
        if (copy == 'a') {
          navigator.clipboard.writeText(a)
        } else if (copy == 'b') {
          navigator.clipboard.writeText(b)
        } else if (copy == 'c') {
          navigator.clipboard.writeText(c)
        } else if (copy == 'A') {
          navigator.clipboard.writeText(A)
        } else if (copy == 'B') {
          navigator.clipboard.writeText(B)
        } else if (copy == 'C') {
          navigator.clipboard.writeText(C)
        } else if (copy != null) {
          alert("Invalid input")
          copied = ""
        } else {
          break
        }
        copy = prompt(copiedText+"Type 'a', 'b', 'c', 'A', 'B', or 'C' to copy values (click cancel when done)")
      }
    }
  } else {
    if (confirm("**Case: "+tcase+"**"+n+n+"Case 1:"+n+"a: "+a+n+"b: "+b+n+"c: "+c+n+"α: "+A+deg+n+"β: "+B+deg+n+"γ: "+C+deg+n+n+"Case 2:"+n+"a2: "+aa+n+"b2: "+bb+n+"c2: "+cc+n+"α2: "+AA+deg+n+"β2: "+BB+deg+n+"γ2: "+CC+deg+n+n+"Copy results to clipboard?")) {
      copy = prompt("Type 'a', 'b', 'c', 'A', 'B', 'C', 'a2', 'b2', 'c2', 'A2', 'B2', or 'C2' to copy values (click cancel when done)")
      while (true) {
        let copiedText = "Copied!\n\n"
        if (copy == 'a') {
          navigator.clipboard.writeText(a)
        } else if (copy == 'b') {
          navigator.clipboard.writeText(b)
        } else if (copy == 'c') {
          navigator.clipboard.writeText(c)
        } else if (copy == 'A') {
          navigator.clipboard.writeText(A)
        } else if (copy == 'B') {
          navigator.clipboard.writeText(B)
        } else if (copy == 'C') {
          navigator.clipboard.writeText(C)
        } else if (copy == 'a2') {
          navigator.clipboard.writeText(aa)
        } else if (copy == 'b2') {
          navigator.clipboard.writeText(bb)
        } else if (copy == 'c2') {
          navigator.clipboard.writeText(cc)
        } else if (copy == 'A2') {
          navigator.clipboard.writeText(AA)
        } else if (copy == 'B2') {
          navigator.clipboard.writeText(BB)
        } else if (copy == 'C2') {
          navigator.clipboard.writeText(CC)
        } else if (copy != null) {
          alert("Invalid input")
          copied = ""
        } else {
          break
        }
        copy = prompt(copiedText+"Type 'a', 'b', 'c', 'A', 'B', 'C', 'a2', 'b2', 'c2', 'A2', 'B2', or 'C2' to copy values (click cancel when done)")
      }
    }
  }
  return
}
// Clear Inputs
function clr() {
  // Fetches values of input fields
  let s1 = document.getElementById("s1")
  let s2 = document.getElementById("s2")
  let s3 = document.getElementById("s3")
  let a1 = document.getElementById("a1")
  let a2 = document.getElementById("a2")
  let a3 = document.getElementById("a3")
  let list = [s1,s2,s3,a1,a2,a3]
  for (x of list) {
    x.value = ""
  }
}