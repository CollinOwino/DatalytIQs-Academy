useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("❌ Error fetching courses:", error.message);
      setErrorMessage("Unable to load courses. Please try again later.");
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  fetchCourses();
}, []);
