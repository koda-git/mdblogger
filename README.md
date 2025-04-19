# 📝 MDBlogger

A personal blogging site powered by [Jekyll](https://jekyllrb.com/) and the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme.  
This project is structured for local development, containerized usage, or deployment via platforms like GitHub Pages or Cloudflare Pages.

---

## 🚀 Features

- ✅ Built on Minimal Mistakes theme (responsive, accessible)
- ✅ Markdown-based posts in `_posts/`
- ✅ Archive pages, category support, and permalinks
- ✅ Optional Docker setup
- ✅ Customizable layout & navigation via `_config.yml`

---

## 🧰 Tech Stack

- **Jekyll** 4.3.4
- **Ruby** ≥ 3.0
- **Minimal Mistakes** ~> 4.26
- **Bundler** ≥ 2.3
- Deps: `jekyll-feed`, `jekyll-include-cache`

---

## 🛠️ Getting Started

### 🔧 Requirements

- Ruby (>= 3.0)
- Bundler (`gem install bundler`)

---

## 🖥️ Deployment on Bare Metal (Ruby + Jekyll)

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve
```

Site will be available at: [http://localhost:4000](http://localhost:4000)

---

## 🐳 Deployment via Docker Compose

```bash
docker compose up --build
```

- The site will be available on `http://localhost:4000`
- Confirmed to work on:
  - ✅ x86_64 systems (e.g., traditional desktops/servers)
  - ✅ ARM64 systems (e.g., Raspberry Pi, Apple Silicon)

Ensure Docker is installed and accessible on your machine.

---

## 🔐 Keeping Dependencies Secure

### 1. **Audit for Vulnerabilities**

Install and run [`bundler-audit`](https://github.com/rubysec/bundler-audit):

```bash
gem install bundler-audit
bundle audit
```

This checks your `Gemfile.lock` against known CVEs.

---

### 2. **Update Dependencies**

Keep Jekyll and its plugins up-to-date with:

```bash
bundle update
```

Or update specific gems:

```bash
bundle update minimal-mistakes-jekyll jekyll-include-cache
```

If you change versions in the `Gemfile`, follow with:

```bash
bundle install
```

---

## 📁 Project Structure

```
.
├── _posts/              # Blog posts in Markdown
├── _data/               # Navigation and metadata
├── _config.yml          # Site configuration
├── Gemfile              # Ruby dependencies
├── docker-compose.yml   # Docker-based local dev (optional)
├── index.md             # Landing page content
└── about.markdown       # About page
```

---

## ✅ Plugin Configuration

Ensure `_config.yml` includes the following:

```yaml
plugins:
  - jekyll-feed
  - jekyll-include-cache
```

---

## 📝 Attribution & License Information

This site uses the following open-source components:

| Component                  | License        | Attribution Required | Source |
|---------------------------|----------------|------------------------|--------|
| Jekyll                    | MIT            | ❌ No                 | https://github.com/jekyll/jekyll |
| Minimal Mistakes Theme    | MIT            | ✅ Optional but Polite | https://github.com/mmistakes/minimal-mistakes |
| jekyll-feed               | MIT            | ❌ No                 | https://github.com/jekyll/jekyll-feed |
| jekyll-include-cache      | MIT            | ❌ No                 | https://github.com/benbalter/jekyll-include-cache |
| font-awesome-sass (if used)| CC BY 4.0     | ✅ Yes (if icons used) | https://github.com/FortAwesome/font-awesome-sass |


## 📜 License

MIT © [koda-git](https://github.com/koda-git)
