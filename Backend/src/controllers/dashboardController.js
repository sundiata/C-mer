// Aggregate simple dashboard metrics from SQLite

const getSummary = (req, res) => {
  const db = global.db;
  const summary = {};

  db.get('SELECT COUNT(*) as count FROM users', [], (e1, r1) => {
    summary.totalUsers = r1 ? r1.count : 0;
    db.get("SELECT COUNT(*) as count FROM users WHERE role = 'admin'", [], (e2, r2) => {
      summary.adminUsers = r2 ? r2.count : 0;
      db.get('SELECT COUNT(*) as count FROM projects', [], (e3, r3) => {
        summary.totalProjects = r3 ? r3.count : 0;
        db.get('SELECT COUNT(*) as count FROM blogs', [], (e4, r4) => {
          summary.totalBlogs = r4 ? r4.count : 0;
          db.get('SELECT COUNT(*) as count FROM contacts', [], (e5, r5) => {
            summary.totalContacts = r5 ? r5.count : 0;

            // recent items
            db.all('SELECT id, title, slug, created_at FROM projects ORDER BY created_at DESC LIMIT 5', [], (e6, recentProjects) => {
              db.all('SELECT id, title, slug, created_at FROM blogs ORDER BY created_at DESC LIMIT 5', [], (e7, recentBlogs) => {
                db.all('SELECT id, first_name, last_name, email, submitted_at FROM contacts ORDER BY submitted_at DESC LIMIT 5', [], (e8, recentContacts) => {
                  return res.json({
                    success: true,
                    data: {
                      summary,
                      recent: {
                        projects: recentProjects || [],
                        blogs: recentBlogs || [],
                        contacts: recentContacts || []
                      }
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

module.exports = {
  getSummary
};















